let data=[];const $=id=>document.getElementById(id),marca=$('marca'),producto=$('producto');
const norm=s=>(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function unique(a){return [...new Set(a)].sort((x,y)=>x.localeCompare(y,'es'))}
function showOptions(input,box,values,onPick){const q=norm(input.value);const found=values.filter(v=>norm(v).includes(q)).slice(0,30);box.innerHTML='';if(!found.length){box.classList.remove('open');return}found.forEach(v=>{const d=document.createElement('div');d.className='option';d.textContent=v;d.onclick=()=>{input.value=v;box.classList.remove('open');onPick(v)};box.appendChild(d)});box.classList.add('open')}
function productsForBrand(){const m=norm(marca.value.trim());return data.filter(x=>!m||norm(x.marca)===m).map(x=>x.producto)}
function resetResult(){$('resultado').className='result hidden'}
marca.oninput=()=>{showOptions(marca,$('marcas'),unique(data.map(x=>x.marca)),()=>{producto.value='';resetResult()});producto.value='';resetResult()};
marca.onfocus=()=>showOptions(marca,$('marcas'),unique(data.map(x=>x.marca)),()=>{});
producto.oninput=()=>{resetResult();showOptions(producto,$('productos'),unique(productsForBrand()),selectProduct)};
producto.onfocus=()=>showOptions(producto,$('productos'),unique(productsForBrand()),selectProduct);
function selectProduct(name){const m=norm(marca.value.trim());const hits=data.filter(x=>norm(x.producto)===norm(name)&&(!m||norm(x.marca)===m));if(!hits.length)return;const x=hits[0];if(!marca.value)marca.value=x.marca;producto.value=x.producto;$('estado').textContent=x.estado;$('seleccion').textContent=`${x.marca} · ${x.producto}`;const r=$('resultado');r.className='result '+(x.estado==='Disponible'?'':x.estado==='Ultimas unidades'?'warning':'danger')}
$('limpiar').onclick=()=>{marca.value='';producto.value='';resetResult();marca.focus()};
document.addEventListener('click',e=>{if(!e.target.closest('.combo'))document.querySelectorAll('.options').forEach(x=>x.classList.remove('open'))});
fetch('/api/productos').then(r=>r.json()).then(j=>{data=j.productos;$('nota').textContent=`Inventario consultado · ${data.length} productos`}).catch(()=>$('nota').textContent='No se pudo cargar el inventario');