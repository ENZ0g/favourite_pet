const ES = new EventSource('https://sf-pyw.mosyag.in/sse/vote/stats')

ES.onerror = error => {
  ES.readyState ? console.error("⛔ EventSource failed: ", error) : null;
};

let cats_voices = 0;
let dogs_voices = 0;
let parrots_voices = 0;

const cats_stat = document.querySelector('.cats');
const dogs_stat = document.querySelector('.dogs');
const parrots_stat = document.querySelector('.parrots');

ES.onmessage = message => {
    const voices_dict = JSON.parse(message.data);
    
    cats_voices = voices_dict.cats;
    dogs_voices = voices_dict.dogs;
    parrots_voices = voices_dict.parrots;
    
    let total_voices = cats_voices + dogs_voices + parrots_voices;
    
    cats_stat.style.width = `${cats_voices / total_voices * 100}%`;
    cats_stat.textContent = `Кошки ${cats_voices}`;
    
    dogs_stat.style.width = `${dogs_voices / total_voices * 100}%`;
    dogs_stat.textContent = `Собаки ${dogs_voices}`;
    
    parrots_stat.style.width = `${parrots_voices / total_voices * 100}%`;
    parrots_stat.textContent = `Попугаи ${parrots_voices}`
};