class MyWebpackPlugin {
  apply (compiler) {
     compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
      // 4. 通过compiler对象可以注册对应的事件，全部的钩子都可以使用
      // 注册一个编译完成的钩子， 一般需要将插件名作为事件名即可
      compiler.hooks.done.tap('MyWebpackPlugin', (stats) => {
          console.log('整个webpack打包结束了');
        });
        // compilation.chunks存放了代码块列表
      for (const fileName in compilation.assets) {
          if (!fileName.includes("assert/") && fileName.match(/.html$/)) {
            const source = compilation.assets[fileName].source();
            let fileStr = "";
            const title = source.match(/<title>(.*?)<\/title>/);
            const commonHead = `<head th:replace="commonFile/header::header('${title ? title[1] : ""}')"></head>`;
            fileStr = source.replace(/<script id="commonHead".*?>.*?<\/script>/, commonHead);
            fileStr = fileStr.replace(/<title>(.*?)<\/title>/, "");

            // js
            fileStr = fileStr.replace(/src="(.*?)"/g, function (_matchStr, str) {
                const src = str.replace(/\.{1,2}\//, "");
                return `th:src="@{/static/${src}}"`;
            });
            // css
            fileStr = fileStr.replace(/href="(.*?)"/g, function (_matchStr, str) {
                const src = str.replace(/\.{1,2}\//, "");
                return `th:href="@{/static/${src}}"`;
            });

            // 替换编辑器的地址
            fileStr = fileStr.replace(/<iframe id="editTools".*?src="(.*?)"/g, function (_matchStr, str) {
                return `<iframe id="editTools" th:src="@{../commonFile/ueditor}"`;
            });

            fileStr = fileStr.replace(/<html(.*?)>/, `<html xmlns:th="http://www.thymeleaf.org">`);
             compilation.assets[fileName] = {
              source () {
                return fileStr;
              },
              size () {
                return fileStr.length;
              },
            };
          }
      }

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
