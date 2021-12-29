using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Fridge_API.Models;

namespace Fridge_API.Controllers
{
    public class itemsController : ApiController
    {
        private smart_fridgeEntities db = new smart_fridgeEntities();

        // GET: api/items/Getitems
        public IHttpActionResult Getitems(int category_id)
        {
            try
            {
                var res = db.items.Where(x => x.category_id == category_id).ToList();
                return Ok(res);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // GET: api/items/5
        [HttpGet]
        public IHttpActionResult Update_item(int item_id, int qty)
        {
            try
            {

                item item = db.items.Find(item_id);
                if (item == null)
                {
                    return NotFound();
                }
                item.qty += qty;
                db.Entry(item).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(item);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT: api/items/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Putitem(int id, item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != item.id)
            {
                return BadRequest();
            }

            db.Entry(item).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!itemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/items
        [ResponseType(typeof(item))]
        public IHttpActionResult Postitem(item item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.items.Add(item);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = item.id }, item);
        }

        // DELETE: api/items/5
        [ResponseType(typeof(item))]
        public IHttpActionResult Deleteitem(int id)
        {
            item item = db.items.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            db.items.Remove(item);
            db.SaveChanges();

            return Ok(item);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool itemExists(int id)
        {
            return db.items.Count(e => e.id == id) > 0;
        }
    }
}