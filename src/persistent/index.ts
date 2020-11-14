import { String       } from './string';
import { String2      } from './string2';
import { StringArray  } from './stringarray';
import { StringArray2 } from './stringarray2';

export namespace persistent {
	export class string      extends String       {}
	export class STRING      extends String2      {}
	export class stringarray extends StringArray  {}
	export class STRINGARRAY extends StringArray2 {}
};
