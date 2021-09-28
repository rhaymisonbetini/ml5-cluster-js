let model;

const csvUrl = 'https://gist.githubusercontent.com/juandes/34d4eb6dfd7217058d56d227eb077ca2/raw/c5c86ea7a32b5ae89ef06734262fa8eff25ee776/cluster_df.csv';

const colMap = {
    0: 'black',
    1: 'green',
    2: 'blue',
    3: 'red'
}

const shapeMap = {
    0: 'circle',
    1: 'square',
    2: 'diamond',
    3: 'cross'
}

function init() {
    createclusterButton();
}

async function execute(k) {
    //k-means configuration
    const options = {
        k,
        maxIter: 20
    }

    model = ml5.kmeans(csvUrl, options, visualizeResult)
}


function createclusterButton() {
    const btn = document.createElement('BUTTON');
    btn.innerText = 'CLUSTER';

    btn.addEventListener('click', () => {
        const slider = document.getElementById('k-range');
        execute(slider.value);
    })
    document.querySelector('#button').appendChild(btn);
}


function visualizeResult() {
    const x = [];
    const y = [];
    const colors = [];
    const shapes = [];

    model.dataset.forEach((e) => {
        x.push(e[0])
        y.push(e[1])
        colors.push(colMap[e.centroid])
        shapes.push(shapeMap[e.centroid])
    });

    const trace = {
        x,
        y,
        mode: 'markers',
        type: 'scatter',
        marker: {
            symbol: shapes,
            color: colors,
        }
    }

    Plotly.newPlot('plot', [trace])
}

init();