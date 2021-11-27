import { Descendant } from 'slate'

export const NOTE_1 = {
  id: 'n1',
  title: 'TODO',
  content: [
    {
      type: 'heading-one',
      children: [{ text: 'Action Items' }],
    },
    {
      type: 'bulleted-list',
      children: [
       {
         type: 'list-item',
         children: [{ text: 'Get milk from the store' }],
       },
       {
         type: 'list-item',
         children: [{ text: 'Finish engineering test' }],
       },
       {
         type: 'list-item',
         children: [{ text: 'Call mom about vacation' }],
       },
       {
         type: 'bulleted-list',
         children: [
	   {
	     type: 'list-item',
	     children: [{ text: 'Pick a location'}],
           },
	   {
	     type: 'list-item',
	     children: [{ text: 'Book transportation'}],
           },
         ]
       },
     ],
    },
  ] as unknown as Array<Descendant>
}

export const NOTE_2 = {
  id: 'n2',
  title: 'Test Note',
  content: [
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text:
            ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'bulleted-list',
      children: [
             {
              type: 'list-item',
              children: [{ text: 'Here is a bullet' }],
	      
             },
     ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Try it out for yourself!' }],
    },
  ] as unknown as Array<Descendant>
}
