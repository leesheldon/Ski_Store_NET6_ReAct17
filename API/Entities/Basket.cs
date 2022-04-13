using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }

        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(x => x.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity});
            }

            var existingProduct = Items.FirstOrDefault(x => x.ProductId == product.Id);
            if (existingProduct != null) existingProduct.Quantity += quantity;
        }

        public void RemoveItem(int producId, int quantity)
        {
            var item = Items.FirstOrDefault(x => x.ProductId == producId);
            if (item == null) return;

            item.Quantity -= quantity;

            if (item.Quantity <= 0) Items.Remove(item);
        }

    }
}