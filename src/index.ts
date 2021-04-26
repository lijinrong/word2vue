import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

function genTemplate(content: string, file_name: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, '../template/template.vue'),
      'utf8',
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        data = data.replace('${content}', content);
        fs.writeFile(`./${file_name}.vue`, data, function (e) {
          if (e) reject(e);
          resolve();
        });
      },
    );
  });
}

function transformElement(element: any) {
  if (element.children) {
    const children = element.children.map(transformElement);
    element = { ...element, children: children };
  }
  if (element.type === 'paragraph') {
    element = transformParagraph(element);
  }
  return element;
}

function transformParagraph(element: any) {
  if (element.alignment === 'center' && !element.styleId) {
    return { ...element, styleName: 'title' };
  } else {
    return element;
  }
}

function realProcess(file_path: string): Promise<void> {
  return new Promise((resolve) => {
    mammoth
      .convertToHtml(
        {
          path: file_path,
        },
        {
          styleMap: [
            "p[style-name='title'] => p.title",
            'b => b',
            'u => span.underline',
          ],
          transformDocument: transformElement,
        },
      )
      .then(function (result: any) {
        const file_name = path.basename(file_path).split(',')[0];
        // 第一个p标签默认为标题
        // result.value = result.value.replace('<p>', '<p class="title">');
        genTemplate(result.value, file_name);
        resolve();
      });
  });
}

function getAllFilesPath(root: string): Array<string> {
  const files = fs.readdirSync(root);
  return files;
}

export async function start(): Promise<void> {
  const file_path: string = process.argv[2];
  const stat = fs.lstatSync(file_path);
  // 如果是文件夹则遍历输出
  if (stat.isDirectory()) {
    const file_paths = getAllFilesPath(file_path);
    const promist_list = file_paths.map(
      (file: string): Promise<null> => {
        return new Promise((resolve) => {
          realProcess(path.join(file_path, file)).then(() => {
            resolve(null);
          });
        });
      },
    );
    await Promise.all(promist_list);
  } else if (stat.isFile()) {
    await realProcess(file_path);
  }
  console.log('done');
}
