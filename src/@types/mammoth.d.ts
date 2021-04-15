interface Input {
  path: string;
}

interface Options {
  transformDocument?: any;
  styleMap?: Array<string>;
  includeDefaultStyleMap?: boolean;
}

declare namespace Mammon {
  function extractRawText(input: Input, option?: Options): Promise;
  function convertToHtml(input: Input, option?: Options): Promise;
  namespace transforms {
    function getDescendantsOfType(...any): any;
    function paragraph(...any): any;
  }
}

export default Mammon;
