console.log('geo_ip_app')

// input
function createDivs (documentQuerySelector,arrayOfIP){
	arrayOfIP.forEach((i) => {
	const divInitial = document.querySelector(documentQuerySelector);
    	const newDivIPs = document.createElement("div");
  	const newContentIPs = document.createTextNode(i);
	
	newDivIPs.appendChild(newContentIPs);
	divInitial.append(newDivIPs)
    }) 
}

// fetch request
function apiIPs(arrayTofetchIPs) {
  return arrayTofetchIPs.map( (i) => {


  	let fetchRes = fetch(`https://ipapi.co/${i}/json/`); 

       fetchRes.then(res => res.json()).then(data => { 
       	 let country_names = [];
	 country_names.push(data.country_name);
	 createDivs('.result', country_names)
       }) 
     })
}

function previewFile() {
  // const initial = document.querySelector('.initial');
  const [file] = document.querySelector('input[type=file]').files;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // this will then display a text file

    let JSONstringifyIPs = JSON.stringify(reader.result).slice(1)
    const arrayOfIPs = JSONstringifyIPs.split('\\r\\n').filter((el) => el !== "\"")
	
     createDivs('.initial', arrayOfIPs)
     apiIPs(arrayOfIPs)
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}

function textWithNewLines(t){
	return t.replaceAll('<div>', '').replaceAll('</div>', '\n')	
}

function copy(id){
let text = document.getElementById(id).innerHTML;
  const copyContent = async () => {
    try {
      const transformedText = textWithNewLines(text);
      await navigator.clipboard.writeText(transformedText);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  copyContent();
}



// Drag and drop не работает
function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
       // console.log(`… file[${i}].name = ${file.name}`);
	console.log(file)
   

     var f = new FileReader();

     fr.onload=function(){
                document.getElementById('output')
                        .textContent=fr.result;
      }
              
      const b = fr.readAsText(this.files[0]);
      console.log(b)	

      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function dragOverHandler(ev) {
  console.log('File(s) in drop zone');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}