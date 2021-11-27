import { Descendant } from 'slate'

export class Note {
  id: string;
  title: string;
  content: Array<Descendant>;

  constructor(id: string, title: string, content: Array<Descendant>) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}
