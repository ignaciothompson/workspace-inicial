let url = 'https://japceibal.github.io/emercado-api/cats_products/101.json'


async function CargarProductos(){
    const response = await fetch(url);
    const info = await response.json();

    console.log(info)
} 


