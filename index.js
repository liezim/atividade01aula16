let postId = 1; 
let pokemonId = 1; 
const maxPosts = 100; 
const maxPokemons = 898; 

async function fetchData() {
    
    postId = (postId % maxPosts) + 1;
    
    pokemonId = (pokemonId % maxPokemons) + 1;

    
    const jsonPlaceholderApiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    try {
        
        const [postResponse, pokemonResponse] = await Promise.all([
            fetch(jsonPlaceholderApiUrl),
            fetch(pokemonApiUrl)
        ]);

        
        if (!postResponse.ok || !pokemonResponse.ok) {
            throw new Error('Erro na requisição das APIs');
        }

        
        const postData = await postResponse.json();
        const pokemonData = await pokemonResponse.json();

        
        document.getElementById('post-title').textContent = postData.title;
        document.getElementById('post-body').textContent = postData.body;

        document.getElementById('pokemon-name').textContent = `Nome: ${pokemonData.name}`;
        document.getElementById('pokemon-height').textContent = `Altura: ${pokemonData.height / 10} m`;
        document.getElementById('pokemon-weight').textContent = `Peso: ${pokemonData.weight / 10} kg`;
        document.getElementById('pokemon-sprite').src = pokemonData.sprites.front_default;

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados. Verifique o console para mais detalhes.');
    }
}