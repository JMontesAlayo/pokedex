import { Container, Card, CardMedia, Grid, CardContent } from "@mui/material";
// import { Container } from "@mui/system"
import { useEffect, useState } from "react";
import PokemonDetail from "./pokemonDetail";
import { getDataFromPokemon } from "./services"

const Home =()=>{

        const imgUrl ="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

        const[pokemons,setPokemon] = useState([])
        
    const fetchPokemonList = async ()=>{
        const listPokemones = await getDataFromPokemon();

console.log("listapokemones", listPokemones.results);
setPokemon(listPokemones.results);

    }

    useEffect(()=>{
        fetchPokemonList();
    },[]);

    return(
        <Container>
            <h1>Pokedex</h1>
            <Grid container spacing ={3}>

            {pokemons.map((pokemon, index)=>(
                //aca el codigo visual 
                <Grid item md ={4} sm ={12} xs={12}>
                    <Card>
                        <CardMedia component ="img" className="img-pokemon" image={`${imgUrl}${index +1}.svg`}/>
                        <CardContent className="center">
                            <h3 className="name-pokemon">{pokemon.name}</h3>
                            <PokemonDetail pepito={pokemon.name} url ={pokemon.url}/>

                        </CardContent>       
                    

                        
                    </Card>
                </Grid>
            ))}

            </Grid>


    
        </Container>

    )
}

export default Home;