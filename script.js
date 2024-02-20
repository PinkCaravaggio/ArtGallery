function handleMouseMove(event, id) {
    if (window.innerWidth > 768){
        const element = document.getElementById(id)
        // Calculate the mouse position relative to the container
        const mouseX = event.offsetX/15;
        const mouseY = event.offsetY/15;

        // Apply scaling to the element
        element.style.transition = `all 0.5s linear`
        element.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${1.03})`;
    }
    else{
        console.log("Some Effect is disabled due to small screen")
    }
}
function handleMouseLeave(id){
    const element = document.getElementById(id)
    element.style.transition = `all 1s ease`
    element.style.transform = `translate(${0}, ${0}) scale(${1})`;
}


let links = {}
function fetchData(){
    fetch('data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvData => {
            const lines = csvData.split('\n'); // Splitting by newline character
            // Processing each line
            let count = 0
            lines.forEach(function(line) {
                const items = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                links[`item-${count}`] = items[4].replace(/"/g, '').toString()
                createNewItemInHTML(`item-${count}`,
                    items[0].replace(/"/g, ''), items[1].replace(/"/g, ''),
                    items[2].replace(/"/g, ''), items[3].replace(/"/g, ''),
                    items[4].replace(/"/g, ''))
                count+=1;
            });
        })
        .catch(error => {
            console.error('Error reading the CSV file:', error);
        });
}

function createNewItemInHTML(id, title, description, date, img_url, artist_statement_url){
    const newItemDiv = document.createElement('div');
    newItemDiv.innerHTML =
        `<img src="imgs/${img_url}" alt="null">
         <p class="art-title">${title}</p>
         <p class="art-description">${description}</p>
         <p class="art-date">${date}&nbsp;&nbsp;&nbsp;<a class="artist_statement" href="${artist_statement_url}">&nbsp;Artist Statemtent&nbsp;</a></p>
        `;
    // Find the container and insert the new content
    const container = document.getElementById('grid-container');
    container.appendChild(newItemDiv);
    newItemDiv.id = `${id}`;
    newItemDiv.onmousemove = function(){handleMouseMove(event, id)}
    newItemDiv.onmouseleave = function(){handleMouseLeave(id)}
    newItemDiv.onclick = function(){onItemClicked(id)}
}
function onItemClicked(id){
    window.open(links[id])
}