import{Button,Chip,Dialog,DialogContent, Grid, Slider, Stack} from "@mui/material"
import { useState } from "react";
import { getDataFromPokemon } from "../services";



const PokemonDetail =(props)=>{
  const [abrir,setAbrir] = useState(false); 
  const [pokemonData,setPokemonData] = useState({});

  const fetchDetailFrontPokemon = async()=>{
    const pokemon = await getDataFromPokemon(props.url);
    setPokemonData(pokemon);
  }

//   const [open,setOpen] = useState(false);
  //vamos hacer una funcion que maneje el estado 

//   const openDialog =()=>{
//     setOpen(true)
//   };

//   const closeDialog=()=>{
//     setOpen(false)
//   }
    const handleOpenDialog = async()=>{
        if(!abrir){
            await fetchDetailFrontPokemon()
        }
        setAbrir(!abrir);
    }
    
    return(
        <div>
        <Button onClick={handleOpenDialog} variant ="contained" color="error"> Detalle del Pokemon</Button>
        <Dialog open={abrir} onClose={handleOpenDialog} fullWidth={"lg"} maxWidth={"lg"}>
            <DialogContent>
               {/* necesifamos extraer ls keys de un objeto  */}
               {Object.keys(pokemonData).length > 0 &&(
                <div>
                    {/* <h2> {props.pepito}</h2> */}
                    <Grid container spacing={4}>
                        <Grid item md={8}>
                        <h4>Habilidades</h4>
                  {pokemonData.abilities.map((abilitie) => (
                    
                      <Chip
                        label={abilitie.ability.name}
                        color="error"
                        sx={{ marginRight: 2 }}
                      />
                   
                  ))}
                  <h4>DAtos</h4>
                  {pokemonData.types.map((type)=>(
                    <Chip
                    label={type.type.name}
                    color="secondary"
                    sx={{marginRight: 2}} 
                    />
                  ))}

                    <Chip
                      label={`${pokemonData.height /10} m `}
                      color="success"
                      sx={{marginRight: 2}} 
                    />

                    <Chip                      
                      label={`${pokemonData.weight /10} kg `}
                      color="success"
                      sx={{marginRight: 2}} 
                    />
                    <h4>Puntos de Base</h4>
                    {pokemonData.stats.map((stat) =>(
                      <div>
                        <h5>{stat.stat.name}</h5>
                        <Slider 
                        defaultValue={stat.base_stat}
                        aria-label="Always Visible"
                        valueLabelDisplay="on"
                        disabled
                        />
                          
                        
                      </div>
                    ))}
                    
                        </Grid>

                
                  <Grid item md={4} className="center">
                    <img width={300} src={pokemonData.sprites.other["official-artwork"].front_default} />
                    <Grid container >
                        <Stack sm={6} direction="row" spacing={16}>
                              <img src={pokemonData.sprites.versions["generation-iii"].emerald["front_shiny"]} width={100} alt="" />
                            
                            <img src={pokemonData.sprites.versions["generation-iii"]["ruby-sapphire"]["back_shiny"]} width={100} alt="" />
                        </Stack>
                    </Grid>
                    {/* <Stack sm={6} spacing={2}>
                        
                      </Stack> */}
                  </Grid>

                    </Grid>
                </div>
               )}
               
                <Button variant="contained" onClick={handleOpenDialog}>Cerrar</Button>
            </DialogContent>
        </Dialog>
        </div>
    );
};


export default PokemonDetail;