export interface IProps {
	multiple?: boolean;
	typeAcceptFiles?: Array<'PNG' | 'JPG' | 'PDF' | 'PPT' | 'PPTX' | 'DOCX'>;
	setValue?: any;
	nameValue?: string;
	loading?: boolean;
}

export const mimeType = {
	PNG: 'image/png',
	JPG: 'image/jpeg',
	PDF: 'application/pdf',
	PPT: 'application/vnd.ms-powerpoint',
	PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export const extensions = {
	PNG: ['.png', '.jpg'],
	JPG: ['.jpg'],
	PDF: ['.pdf'],
	PPT: ['.ppt'],
	PPTX: ['.pptx'],
	DOCX: ['.docx'],
};
