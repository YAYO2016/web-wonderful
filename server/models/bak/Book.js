/**
 * Created by yanyue on 2020/4/3 22:20
 * 电子书实体类
 */
const {MIME_TYPE_EPUB, UPLOAD_URL, UPLOAD_PATH} = require("../../utils/constant");
const fs = require("fs");
const Epub = require("../../utils/epub");
const xml2js = require('xml2js').parseString


class Book {
    //构造函数
    constructor(file, data) {
        // file解析电子书数据,如果传入的是file对象，表示当前电子书对象是一个刚上传的电子书文件
        // data表示现在是插入或者更新数据库中的电子书数据
        if (file) {
            this.createBookFromFile(file);
        } else {
            this.createBookFormData(data);
        }

    }

    createBookFromFile(file) {
        //console.log("createBookFromFile", file);
        //request请求过来的file对象的属性
        /**
         {
              fieldname: 'file',
              originalname: '王小波全集.epub',
              encoding: '7bit',
              mimetype: 'application/epub',
              destination: 'D:\\YAYO-WEB\\millennium-eye\\front\\server\\upload\\book',
              filename: 'c8e58dc445afa1cef84bd62c166d0bc0',
              path:'D:\\YAYO-WEB\\millennium-eye\\front\\server\\upload\\book\\c8e58dc445afa1cef84bd62c166d0bc0',
              size: 2160754
            }
         */

            //destination文件地址
            //filename 文件名
            //mimetype 文件类型
            //path 文件地址+文件名
        const {destination, filename, mimetype, path, originalname} = file;
        //电子书后缀名：suffix文件后缀名
        const suffix = mimetype === MIME_TYPE_EPUB ? ".epub" : "";
        //电子书原有路径，这个是没有文件的后缀名的
        const oldBookPath = path;
        //电子书的新路径
        const bookPath = `${destination}\\${filename}${suffix}`;
        //文件下载URL链接
        const url = `${UPLOAD_URL}\\book\\${filename}${suffix}`;
        //文件解压后路径
        const unzipPath = `${UPLOAD_PATH}\\unzip\\${filename}`;
        //文件解压路径URL
        const unzipUrl = `${UPLOAD_URL}\\unzip\\${filename}`;
        //文件异步判断是否存在该目录
        if (!fs.existsSync(unzipPath)) {
            //没有就迭代去创建目录
            fs.mkdirSync(unzipPath, {recursive: true})
        }
        //oldBookPath存在，bookPath不存在的时候
        if (fs.existsSync(oldBookPath) && !fs.existsSync(bookPath)) {
            //将文件重新命名，带上文件的类型后缀epub
            fs.renameSync(oldBookPath, bookPath);
        }
        this.fileName = filename // 文件名
        this.path = `/book/${filename}${suffix}` // epub文件相对路径
        this.filePath = this.path
        this.unzipPath = `/unzip/${filename}` // epub解压后相对路径
        this.url = url // epub文件下载链接
        this.title = '' // 书名
        this.author = '' // 作者
        this.publisher = '' // 出版社
        this.contents = [] // 目录
        this.cover = '' // 封面图片URL
        this.coverPath = '' // 封面图片路径
        this.category = -1 // 分类ID
        this.categoryText = '' // 分类名称
        this.language = '' // 语种
        this.unzipUrl = unzipUrl // 解压后文件夹链接
        this.originalname = originalname // 电子书文件的原名


    }

    createBookFormData(data) {
        this.fileName = data.fileName;
        this.bookId = data.fileName;
        this.rootFile = data.rootFile;
        this.path = data.path || data.filePath;
        this.unzipPath = data.unzipPath;
        this.url = data.url;
        this.title = data.title;
        this.author = data.author;
        this.publisher = data.publisher;
        this.contents = data.contents;
        this.cover = data.cover;
        this.coverPath = data.coverPath;
        this.category = data.category || 99;
        this.categoryText = data.categoryText || "自定义";
        this.language = data.language;
        this.originalname = data.originalname;

        this.createUser = data.username;
        this.createDt = new Date().getTime();
        this.updateDt = new Date().getTime();
        this.updateType = data.undateType === 0 ? date.updateType : 1;

    }

    //解析epub文件
    parse() {
        return new Promise((resolve, reject) => {
            const bookPath = `${UPLOAD_PATH}${this.filePath}`;
            if (!fs.existsSync(bookPath)) {
                reject(new Error('电子书不存在'))
            }
            const epub = new Epub(bookPath);
            epub.on('error', err => {
                reject(err)
            });
            epub.on('end', err => {
                if (err) {
                    reject(err)
                } else {
                    const {
                        language,
                        creator,
                        creatorFileAs,
                        title,
                        cover,
                        publisher
                    } = epub.metadata;
                    if (!title) {
                        reject(new Error('图书标题为空'))
                    } else {
                        this.title = title;
                        this.language = language || 'en';
                        this.author = creator || creatorFileAs || 'unknown';
                        this.publisher = publisher || 'unknown';
                        this.rootFile = epub.rootFile;
                        const handleGetImage = (err, file, mimeType) => {
                            if (err) {
                                //console.log("err111", err);
                                reject(err)
                            } else {
                                const suffix = mimeType.split('/')[1];
                                const coverPath = `${UPLOAD_PATH}/img/${this.fileName}.${suffix}`;
                                const coverUrl = `${UPLOAD_URL}/img/${this.fileName}.${suffix}`;
                                fs.writeFileSync(coverPath, file, 'binary');
                                this.coverPath = `/img/${this.fileName}.${suffix}`;
                                this.cover = coverUrl;
                                resolve(this)
                            }
                        };
                        try {
                            this.unzip();
                            this.parseContents(epub).then(({chapters}) => {
                                this.contents = chapters;
                                epub.getImage(cover, handleGetImage)
                            })
                        } catch (e) {
                            reject(e)
                        }
                    }
                }
            });
            epub.parse()
        })
    }

    unzip() {
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(Book.genPath(this.path));
        zip.extractAllTo(Book.genPath(this.unzipPath), true)
    }

    parseContents(epub) {
        function getNcxFilePath() {
            const spine = epub && epub.spine;
            const manifest = epub && epub.manifest;
            const ncx = spine.toc && spine.toc.href;
            const id = spine.toc && spine.toc.id;
            if (ncx) {
                return ncx
            } else {
                return manifest[id].href
            }
        }

        function findParent(array, level = 0, pid = '') {
            return array.map(item => {
                item.level = level;
                item.pid = pid;
                if (item.navPoint && item.navPoint.length > 0) {
                    item.navPoint = findParent(item.navPoint, level + 1, item['$'].id)
                } else if (item.navPoint) {
                    item.navPoint.level = level + 1;
                    item.navPoint.pid = item['$'].id
                }
                return item
            })
        }

        function flatten(array) {
            return [].concat(...array.map(item => {
                if (item.navPoint && item.navPoint.length > 0) {
                    return [].concat(item, ...flatten(item.navPoint))
                } else if (item.navPoint) {
                    return [].concat(item, item.navPoint)
                }
                return item
            }))
        }

        const ncxFilePath = Book.genPath(`${this.unzipPath}/${getNcxFilePath()}`);
        if (fs.existsSync(ncxFilePath)) {
            return new Promise((resolve, reject) => {
                const xml = fs.readFileSync(ncxFilePath, 'utf-8');
                const fileName = this.fileName;
                xml2js(xml, {
                    explicitArray: false,
                    ignoreAttrs: false
                }, function (err, json) {
                    if (err) {
                        reject(err)
                    } else {
                        const navMap = json.ncx.navMap;
                        //console.log('xml', navMap);
                        if (navMap.navPoint && navMap.navPoint.length > 0) {
                            navMap.navPoint = findParent(navMap.navPoint);
                            const newNavMap = flatten(navMap.navPoint);
                            const chapters = [];
                            epub.flow.forEach((chapter, index) => {
                                if (index + 1 > newNavMap.length) {
                                    return
                                }
                                const nav = newNavMap[index];
                                chapter.text = `${UPLOAD_URL}/unzip/${fileName}/${chapter.href}`;
                                if (nav && nav.navLabel) {
                                    chapter.label = nav.navLabel.text || ''
                                } else {
                                    chapter.label = ''
                                }
                                chapter.level = nav.level;
                                chapter.pid = nav.pid;
                                chapter.navId = nav['$'].id;
                                chapter.fileName = fileName;
                                chapter.order = index + 1;
                                chapters.push(chapter)
                            });
                            resolve({chapters})
                        } else {
                            reject(new Error('目录解析失败，目录数为0'))
                        }
                    }
                })
            })
        } else {
            throw new Error('目录文件不存在')
        }
    }

    static genPath(path) {
        if (!path.startsWith('/')) {
            path = `/${path}`
        }
        return `${UPLOAD_PATH}${path}`
    }
}

module.exports = Book;
