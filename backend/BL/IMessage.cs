namespace backend.BL
{
    public interface IMessage
    {
        string Address { get; set; }
        string[] AddressCC { get; set; }
        string AddressFrom { get; set; }
        string AddressFromDisplay { get; set; }
        string[] AddressTo { get; set; }
        //FilePath[] filesPath { get; set; }
        string FooterHtml { get; set; }
        string HeaderHtml { get; set; }
        string HtmlContent { get; set; }
        string message { get; set; }
        string Name { get; set; }
        string Subject { get; set; }
    }
}