using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KsiazkiController : ControllerBase
    {
        private static int _idGenerator = 6;
        private static readonly List<Ksiazka> _data = new()
        {
    new Ksiazka { Id = 1, Tytul = "Pan KAMIL", Cena = 72.19m, DataWydania = new DateTime(1906, 1, 1) },
    new Ksiazka { Id = 2, Tytul = "PLOCK", Cena = 59.90m, DataWydania = new DateTime(1890, 5, 15) },
    new Ksiazka { Id = 3, Tytul = "Quo Vadis", Cena = 64.50m, DataWydania = new DateTime(1896, 3, 26) },
    new Ksiazka { Id = 4, Tytul = "Chłopi", Cena = 68.75m, DataWydania = new DateTime(1904, 11, 1) },
    new Ksiazka { Id = 5, Tytul = "Krzyżacy", Cena = 54.99m, DataWydania = new DateTime(1900, 7, 25) },
    new Ksiazka { Id = 6, Tytul = "Ostatnie życzenie", Cena = 39.99m, DataWydania = new DateTime(1993, 1, 1) },
    new Ksiazka { Id = 7, Tytul = "Miecz przeznaczenia", Cena = 39.99m, DataWydania = new DateTime(1992, 1, 1) },
    new Ksiazka { Id = 8, Tytul = "Krew elfów", Cena = 42.50m, DataWydania = new DateTime(1994, 1, 1) },
    new Ksiazka { Id = 9, Tytul = "Czas pogardy", Cena = 42.50m, DataWydania = new DateTime(1995, 1, 1) },
    new Ksiazka { Id = 10, Tytul = "Chrzest ognia", Cena = 44.99m, DataWydania = new DateTime(1996, 1, 1) },
    new Ksiazka { Id = 11, Tytul = "Wieża Jaskółki", Cena = 44.99m, DataWydania = new DateTime(1997, 1, 1) },
    new Ksiazka { Id = 12, Tytul = "Pani Jeziora", Cena = 46.99m, DataWydania = new DateTime(1999, 1, 1) },
    new Ksiazka { Id = 13, Tytul = "Sezon burz", Cena = 41.00m, DataWydania = new DateTime(2013, 11, 6) },
    new Ksiazka { Id = 14, Tytul = "Coś się kończy, coś się zaczyna", Cena = 35.00m, DataWydania = new DateTime(2000, 1, 1) },
    new Ksiazka { Id = 15, Tytul = "Wiedźmin - Ostatnie życzenie (komiks)", Cena = 29.99m, DataWydania = new DateTime(2014, 6, 1) }
};

        [HttpGet]
        [HttpGet]
        public ActionResult<IEnumerable<Ksiazka>> Get(
    [FromQuery] string? tytul = null,
    [FromQuery] int? page = null,
    [FromQuery] int? pageSize = null)
        {
            IEnumerable<Ksiazka> result = _data;

            if (!string.IsNullOrWhiteSpace(tytul))
            {
                result = result.Where(k =>
                    k.Tytul.Contains(tytul, StringComparison.OrdinalIgnoreCase));
            }

            if (page.HasValue && pageSize.HasValue && page > 0 && pageSize > 0)
            {
                result = result
                    .Skip((page.Value - 1) * pageSize.Value)
                    .Take(pageSize.Value);
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public ActionResult<Ksiazka> GetById(int id)
        {
            var ksiazka = _data.FirstOrDefault(k => k.Id == id);
            if (ksiazka == null)
                return NotFound();
            return Ok(ksiazka);
        }

        [HttpPost]
        public ActionResult<Ksiazka> Post([FromBody] Ksiazka ksiazka)
        {
            ksiazka.Id = _idGenerator++;
            _data.Add(ksiazka);
            return CreatedAtAction(nameof(GetById), new { id = ksiazka.Id }, ksiazka);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Ksiazka ksiazka)
        {
            var existing = _data.FirstOrDefault(k => k.Id == id);
            if (existing == null)
                return NotFound();

            existing.Tytul = ksiazka.Tytul;
            existing.Cena = ksiazka.Cena;
            existing.DataWydania = ksiazka.DataWydania;
            return Ok(true);
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var ksiazka = _data.FirstOrDefault(k => k.Id == id);
            if (ksiazka == null)
                return NotFound();

            _data.Remove(ksiazka);
            return Ok(true);
        }
        [HttpGet("random")]
        public ActionResult<int> GetRandom()
        {
            var random = new Random();
            return Ok(random.Next(50, 101));
        }
    }
}