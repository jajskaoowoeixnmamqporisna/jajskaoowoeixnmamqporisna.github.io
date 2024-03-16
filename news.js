const link = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTq9r-tTOl_miFjaTeHFtsYQIu7uJP44v4Zoo1i2Km6VH1dfPfPuNKph8ATLmQhA-EIfFffhOAH4Q3C/pub?output=tsv';

fetch(link)
.then(response => response.text())
.then(data => {
    const rows = data.split('\n').map(row => row.split('\t')); // Split by tabs for TSV format
    const container = document.getElementById('data-container');

    rows.forEach(row => {
        const imageSrc = row[0]; // assuming the first column contains image URLs
        const title = row[1];    // assuming the second column contains titles
        const text = row[2];
        const text2 = row[3];
        const text3 = row[4];
        const buttonname = row[5];
        const buttoncolor = row[6];
        const buttonlink = row[7];

        const div = document.createElement('div');
        div.classList.add('data-item');

        const img = document.createElement('img');
        img.src = imageSrc;

        const h2 = document.createElement('h2');
        h2.textContent = title;

        const p = document.createElement('p');
        p.textContent = text;
        
        const p2 = document.createElement('p');
        p2.textContent = text2;
        
        const p3 = document.createElement('p');
        p3.textContent = text3;
        
        const button = document.createElement('button');
        button.textContent = buttonname;
        button.style.backgroundColor = buttoncolor;
        button.onclick = function() {
            window.location.href = buttonlink;
        };
        
        
        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        div.appendChild(button);

        container.appendChild(div);
    });
});
