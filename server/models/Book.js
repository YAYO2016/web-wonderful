/**
 * Created by yanyue on 2020/4/3 22:20
 * 电子书实体类
 */
const {MIME_TYPE_EPUB, UPLOAD_URL, UPLOAD_PATH} = require("../utils/constant");
const fs = require("fs");


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
        console.log("createBookFromFile", file);
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
        const {destination, filename, mimetype, path,originalname} = file;
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
        this.filename = filename; //multer生成的文件名（一般是一堆数字）
        this.path = `\\book\\${filename}${suffix}`; //epub文件的相对路径
        this.filepath = `\\unzip\\${filename}`;  //epub解压后的相对路径
        this.filename = this.path;
        this.url = url; //电子书的下载地址
        this.title = ''; // 书名
        this.author = '';// 作者
        this.publisher = ''; // 出版社
        this.contents = [];// 目录
        this.cover = ''; // 封面图片URL
        this.coverPath = ''; // 封面图片路径
        this.category = -1;// 分类ID
        this.categoryText = ''; // 分类名称
        this.language = '';// 语种
        this.unzipUrl = unzipUrl;// 解压后文件夹链接
        this.originalname = originalname; // 电子书文件的原名


    }

    createBookFormData(data) {

    }
}

module.exports = Book;
