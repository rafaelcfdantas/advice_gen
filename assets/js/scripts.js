window.addEventListener('load', () => {
    getAdvice();
});

async function getAdvice() {
    try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        const advice = response.data.slip;
        const translation = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
            params: {
                q: advice.advice,
                target: 'pt',
                source: 'en',
                format: 'text',
                key: 'AIzaSyCKvFCdhPe7qtQqC0mS5pRGJrXu6nLXmhE'
            }
        });

        document.getElementById('advice__text').innerText = '“' + translation.data.data.translations[0].translatedText + '”';
        document.getElementById('advice_number').classList.remove('hide');
        document.getElementById('advice_number').innerText = 'Conselho #' + advice.id;
    } catch (error) {
        console.log(error);
        let messageComplement = error.code === 'ERR_NETWORK' ? 'você parece estar desconectado' : 'algo deu errado' ;
        document.getElementById('advice__text').innerText = `Essa não... ${messageComplement} 😢. Tente novamente mais tarde!`;
        document.getElementById('advice_number').classList.add('hide');
    }
}