const finalizarCompra = document.getElementById("finalizar-compra")

finalizarCompra.addEventListener("click", () => {
    console.log("Hola");

    fetch("/api/carts/finalizarCompra", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
})