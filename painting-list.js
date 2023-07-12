
const setEditModal = (id) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', `https://gallery-server-441cb7f3d028.herokuapp.com/gallery/${id}`, false);
    xhttp.send();

    const painting = JSON.parse(xhttp.responseText);

    const {
        idNum,
        title,
        artist,
        date,
        link,
    } = painting; 

    document.getElementById('idNum').value = idNum;
    document.getElementById('title').value = title;
    document.getElementById('artist').value = artist;
    document.getElementById('date').value = date;
    document.getElementById('link').value = link;

    document.getElementById('editForm').action = `https://gallery-server-441cb7f3d028.herokuapp.com/gallery/${id}`;

}

const deletePainting = (id) => {
    const xhttp = new XMLHttpRequest();
    
    xhttp.open("DELETE", `https://gallery-server-441cb7f3d028.herokuapp.com/gallery/${id}`, false);
    xhttp.send();

    location.reload()
}

const loadGallery = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://gallery-server-441cb7f3d028.herokuapp.com/gallery", false);
    xhttp.send();

    const gallery = JSON.parse(xhttp.responseText);

    for (let painting of gallery) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${painting.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${painting.artist}</h6>
                        <div>Date: ${painting.date}</div>
                        <hr>
                        <div>Preview: <a href="${painting.link}" 
                        target="_blank"><img class="img-thumbnail" src="${painting.link}" /></a></div>
                        <hr>

                        <button type="button"  class="btn btn-danger" onClick="deletePainting(${painting.idNum})">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                        data-target="#editPaintingModal" onClick="setEditModal(${painting.idNum})">
                        Edit
                    </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('paintings').innerHTML = document.getElementById('paintings').innerHTML + x;
    }
}

loadGallery();