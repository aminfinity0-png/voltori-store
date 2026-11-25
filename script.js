// Edit this list to change products. Prices in USD.
const PRODUCTS = [
  {id:1, name:"MagSafe Wireless Charger 15W", cat:"Charging", price:24.99, old:39.99, icon:"🔋", desc:"Fast magnetic charging for iPhone and Qi phones."},
  {id:2, name:"65W GaN USB-C Charger", cat:"Charging", price:29.99, old:44.99, icon:"⚡", desc:"Charge laptop, phone and tablet from one compact brick."},
  {id:3, name:"ANC Wireless Earbuds", cat:"Audio", price:34.99, old:59.99, icon:"🎧", desc:"Active noise cancelling, 30-hour battery with case."},
  {id:4, name:"Mini Bluetooth Speaker", cat:"Audio", price:19.99, old:29.99, icon:"🔊", desc:"Waterproof, pocket size, big sound."},
  {id:5, name:"Smart LED Strip 5m", cat:"Smart Home", price:21.99, old:34.99, icon:"💡", desc:"App and voice control, 16M colours, music sync."},
  {id:6, name:"Mini Smart Plug (2-pack)", cat:"Smart Home", price:17.99, old:24.99, icon:"🔌", desc:"Works with Alexa and Google Home."},
  {id:7, name:"Aluminium Laptop Stand", cat:"Desk", price:27.99, old:39.99, icon:"💻", desc:"Adjustable height, better posture, cooler laptop."},
  {id:8, name:"Magnetic Cable Organizer", cat:"Desk", price:9.99, old:14.99, icon:"🧲", desc:"Keep every cable tidy on your desk."}
];

let cart = JSON.parse(localStorage.getItem("voltori_cart") || "{}");
let filter = "All";

function renderFilters(){
  const cats = ["All", ...new Set(PRODUCTS.map(p=>p.cat))];
  document.getElementById("filters").innerHTML = cats.map(c =>
    `<button class="${c===filter?'on':''}" onclick="setFilter('${c}')">${c}</button>`).join("");
}
function setFilter(c){ filter=c; renderFilters(); renderGrid(); }
function renderGrid(){
  const list = PRODUCTS.filter(p => filter==="All" || p.cat===filter);
  document.getElementById("grid").innerHTML = list.map(p => `
    <div class="card">
      <div class="ico">${p.icon}</div>
      <h4>${p.name}</h4><p>${p.desc}</p>
      <div class="row"><span><span class="price">$${p.price.toFixed(2)}</span><span class="old">$${p.old.toFixed(2)}</span></span>
      <button onclick="add(${p.id})">Add</button></div>
    </div>`).join("");
}
function save(){ localStorage.setItem("voltori_cart", JSON.stringify(cart)); renderCart(); }
function add(id){ cart[id]=(cart[id]||0)+1; save(); document.getElementById("cart").classList.add("open"); }
function dec(id){ cart[id]--; if(cart[id]<=0) delete cart[id]; save(); }
function renderCart(){
  let total=0, count=0;
  const html = Object.entries(cart).map(([id,q])=>{
    const p = PRODUCTS.find(x=>x.id==id); if(!p) return "";
    total += p.price*q; count += q;
    return `<div class="ci"><span>${p.name} × ${q}</span><span>$${(p.price*q).toFixed(2)} <button onclick="dec(${id})">−</button></span></div>`;
  }).join("");
  document.getElementById("cart-items").innerHTML = html || "<p>Your cart is empty.</p>";
  document.getElementById("cart-total").textContent = total.toFixed(2);
  document.getElementById("cart-count").textContent = count;
}
function toggleCart(){ document.getElementById("cart").classList.toggle("open"); }
function checkout(){
  const lines = Object.entries(cart).map(([id,q])=>{const p=PRODUCTS.find(x=>x.id==id);return `${p.name} x ${q}`;});
  if(!lines.length){ alert("Your cart is empty."); return; }
  const body = encodeURIComponent("Hi Voltori, I'd like to order:\n" + lines.join("\n") + "\n\nTotal: $" + document.getElementById("cart-total").textContent);
  window.location.href = "mailto:hello@voltori.store?subject=New%20order&body=" + body;
}
document.getElementById("yr").textContent = new Date().getFullYear();
renderFilters(); renderGrid(); renderCart();
