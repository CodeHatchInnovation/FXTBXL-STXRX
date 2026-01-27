document.addEventListener('DOMContentLoaded', () => {
    const productos = [
        { id: "p1", nombre: "Nike Phantom 6 Mamba", precio: 5299, desc: "Precisión implacable. Edición especial inspirada en el instinto de la Black Mamba.", img: "https://static.nike.com/a/images/w_1280,q_auto,f_auto/3299838b-a929-40bc-bc0d-f97008d6bd6f/phantom-6-high-black-mamba-if4394-001-release-date.jpg", tallas: [26, 27, 28, 29] },
        { id: "p2", nombre: "Adidas X Crazyfast Messi", precio: 1499, desc: "Velocidad pura. El calzado oficial del Rey para cambios de dirección explosivos.", img: "adidas messi.png", tallas: [25, 26, 27, 28] },
        { id: "p3", nombre: "Nike Phantom GX 2 Academy", precio: 2099, desc: "Toque quirúrgico con NikeSkin y tracción Cyclone 360 para agilidad total.", img: "https://soccerpost.com/cdn/shop/files/AURORA_FJ2577-400_PHSRH000-2000_clipped_rev_1.png?v=1721659274&width=1200", tallas: [26, 27, 28, 29] },
        { id: "p4", nombre: "Puma Future Ultimate", precio: 4199, desc: "Ajuste adaptativo FUZIONFIT360. Diseñado para los creadores de juego.", img: "https://placehold.co/600x600/ffffff/7c3aed?text=Puma+Future", tallas: [27, 28, 29] },
        { id: "p5", nombre: "Mizuno Morelia Neo IV", precio: 5600, desc: "K-Leather de élite. El estándar de oro de la artesanía japonesa.", img: "https://placehold.co/600x600/ffffff/7c3aed?text=Mizuno+Neo", tallas: [26, 27, 28] },
        { id: "p6", nombre: "Nike Tiempo Legend 10", precio: 3499, desc: "Piel sintética avanzada FlyTouch Lite para un control de balón superior.", img: "https://placehold.co/600x600/ffffff/7c3aed?text=Nike+Tiempo", tallas: [25, 26, 27] }
    ];

    let carrito = [], seleccionado = null, tallaActiva = null, rating = 0;
    const grid = document.getElementById('contenedor-productos');
    const modal = document.getElementById('modal-producto');
    const sidebar = document.getElementById('carrito-sidebar');

    // Renderizar tarjetas con tamaño estandarizado
    productos.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = "reveal card-vantage p-8 cursor-pointer flex flex-col group";
        div.style.animationDelay = `${i * 0.1}s`;
        div.innerHTML = `
            <div class="img-container-fix mb-6">
                <img src="${p.img}" class="transition-transform duration-700 group-hover:scale-110">
            </div>
            <h3 class="font-nike text-lg mb-1">${p.nombre}</h3>
            <p class="text-gray-400 text-sm font-bold">$${p.precio.toLocaleString()}</p>
        `;
        div.onclick = () => abrirModal(p);
        grid.appendChild(div);
    });

    window.abrirModal = (p) => {
        seleccionado = p; tallaActiva = null;
        document.getElementById('titulo-modal').innerText = p.nombre;
        document.getElementById('precio-modal').innerText = `$${p.precio.toLocaleString()} MXN`;
        document.getElementById('desc-modal').innerText = p.desc;
        document.getElementById('img-modal').src = p.img;
        document.getElementById('tallas-modal').innerHTML = p.tallas.map(t => 
            `<button onclick="marcarTalla(${t}, this)" class="py-4 border border-gray-100 text-xs font-bold hover:border-[#7c3aed] transition-all">${t}</button>`).join('');
        
        // Cargar reseñas desde Firebase
        const ref = window.fbRef(window.fbDB, `resenas_v4/${p.id}`);
        window.fbOnValue(ref, (snap) => {
            const data = snap.val();
            document.getElementById('lista-reseñas').innerHTML = data ? Object.values(data).reverse().map(r => `
                <div class="border-b border-gray-50 pb-4">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[9px] font-black uppercase text-[#7c3aed]">${r.u}</span>
                        <div class="text-[#7c3aed] text-[7px]">${'<i class="ph-fill ph-star"></i>'.repeat(r.e)}</div>
                    </div>
                    <p class="text-xs text-gray-500 font-light">"${r.c}"</p>
                </div>
            `).join('') : '<p class="text-[10px] text-gray-300 uppercase tracking-widest">Sin reseñas todavía.</p>';
        });

        modal.classList.remove('hidden');
    };

    window.marcarTalla = (t, b) => {
        tallaActiva = t;
        document.querySelectorAll('#tallas-modal button').forEach(x => x.classList.remove('talla-active'));
        b.classList.add('talla-active');
    };

    window.setRating = (n) => {
        rating = n;
        document.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('star-active', i < n));
    };

    document.getElementById('btn-publicar-reseña').onclick = () => {
        const u = document.getElementById('nombre-usuario').value, c = document.getElementById('texto-reseña').value;
        if(!u || !c || !rating) return alert("Completa los campos de la reseña.");
        window.fbPush(window.fbRef(window.fbDB, `resenas_v4/${seleccionado.id}`), { u, c, e: rating }).then(() => {
            document.getElementById('nombre-usuario').value = ""; document.getElementById('texto-reseña').value = ""; window.setRating(0);
        });
    };

    document.getElementById('btn-agregar-carrito').onclick = () => {
        if(!tallaActiva) return alert("Selecciona una talla.");
        carrito.push({...seleccionado, talla: tallaActiva, cId: Date.now()});
        actualizarCarrito(); modal.classList.add('hidden'); sidebar.classList.remove('hidden');
    };

    function actualizarCarrito() {
        let total = 0;
        document.getElementById('items-carrito').innerHTML = carrito.map(i => {
            total += i.precio;
            return `<div class="flex gap-4 items-center bg-gray-50 p-4 border border-gray-100">
                <img src="${i.img}" class="w-12 h-12 object-contain">
                <div class="flex-1 text-[10px] font-bold uppercase truncate">${i.nombre}</div>
                <button onclick="borrarItem(${i.cId})" class="text-gray-300 hover:text-red-500"><i class="ph-fill ph-trash"></i></button>
            </div>`;
        }).join('');
        document.getElementById('total-carrito').innerText = `$${total.toLocaleString()}`;
        document.getElementById('badge-carrito').innerText = carrito.length;
        document.getElementById('badge-carrito').classList.toggle('hidden', !carrito.length);
    }

    // Lógica para cerrar (Asegurada)
    window.borrarItem = (id) => { carrito = carrito.filter(i => i.cId !== id); actualizarCarrito(); };
    document.getElementById('abrir-carrito').onclick = () => sidebar.classList.remove('hidden');
    document.getElementById('btn-cerrar-carrito').onclick = () => sidebar.classList.add('hidden');
    document.getElementById('btn-cerrar-modal').onclick = () => modal.classList.add('hidden');
    document.getElementById('cerrar-fondo-modal').onclick = () => modal.classList.add('hidden');
});