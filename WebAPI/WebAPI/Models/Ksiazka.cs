namespace WebAPI.Models
{
    public class Ksiazka
    {
        public int Id { get; set; }
        public string Tytul { get; set; } = string.Empty;
        public decimal Cena { get; set; }
        public DateTime DataWydania { get; set; }
    }
}
