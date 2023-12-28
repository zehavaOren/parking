import { FilePath } from "./FilePath.model";
export interface Message {
    address: string;
    subject: string;
    message: string;
    addressFrom: string;
    AddressFromDisplay: string;
    AddressCC: string[];
    AddressTo: string[];
    filesPath: FilePath[];
    HtmlContent: string;
    Name: string
    FooterHtml: string;
    HeaderHtml: string;
}


