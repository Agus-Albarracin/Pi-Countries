import Nav from "../../components/Nav/nav";
import { useState } from "react";
import { postActivity, getCountries } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import validation from "./validations"
import './form.css'
import Footer from "../../components/Footer/Footer";

const Form = () => {

    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries);

    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState("");

    const countriesList = countries.map(country =>{
        return({
            name:country.name,
            flag: country.flags?.png 
        })
    }).sort((a, b) => a.name.localeCompare(b.name));;

    const [form, setForm] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries:[],
        
    })

    const handleChange = (event) => {
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...form, 
            [event.target.name]: event.target.value
        }))
    }

    const handleCountries = (event) => {
        if(event.target.value !== 'Select Country' && !form.countries.includes(event.target.value)){
            setForm({
                ...form,
                countries:[...form.countries, event.target.value]
            })
            setErrors(validation({
                ...form, 
                countries: [...form.countries, event.target.value]
            }))
        }
    }

    const handleSeasons = (event) => {
        if(event.target.value !== 'Select season' && !form.season.includes(event.target.value)){
            setForm({
                ...form,
                season: event.target.value
            })
            setErrors(validation({
                ...form, 
                season: event.target.value
            }))
        }
    }

    const handleDifficulty = (event) => {
        if(event.target.value !== 'Select difficulty' && !form.difficulty.includes(event.target.value)){
            setForm({
                ...form,
                difficulty: event.target.value
            })
            setErrors(validation({
                ...form, 
                difficulty: event.target.value
            }))
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(form.name === '' && form.duration === '' && form.difficulty === ''  && form.season === ''  && form.countries === '') return alert('Incomplete fields, please complete all fields')
        dispatch(postActivity(form))
        alert("Activity created successfully")
        setForm({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: [],
        })
    }

    const deleteCountry = (event) => {
        setForm({
            ...form,
            countries: form.countries.filter((country) => country !== event.target.value)
        })
        setErrors(validation({
            ...form,
            countries: form.countries.filter((country) => country !== event.target.value)
        }))
    }

    const handleErrors = (event) => {
        event.preventDefault();
        setErrors(validation({
            ...form, 
            countries: [...form.countries, event.target.value]
        }))
        handleSubmit(event)
    }

    const disabled = (form.name === "" || form.difficulty === "" || form.duration === "" || form.season === "" || form.countries.length === 0)
    
    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

return (
    <div className='form-component' >
        <Nav/>
        <div className='div-container'>
    <form className='form-container' onSubmit={handleSubmit}>

            <h1 className='label'>Create your tourist activity</h1>
            
            <div className='input-container'>
                <div className='label'>
                    <label >Name </label>
                </div>
                <input className='input-div' type="text" onChange={handleChange} value={form.name} name="name" placeholder="Activity name"/>
                {errors.name && <p className='errors'>{errors.name}</p>}
            </div>

            <div className='input-container'>
                <div className='label'>
                    <label>Difficulty </label>
                </div>
            <select className='select-div' onChange={handleDifficulty}>
                        <option className='' value="empty">Select Difficulty</option>
                        <option value="1">⭐️</option>
                        <option value="2">⭐️⭐️</option>
                        <option value="3">⭐️⭐️⭐️</option>
                        <option value="4">⭐️⭐️⭐️⭐️</option>
                        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                    </select>
                {console.log(form)}
                {/* <input className='' type="text" onChange={handleChange} value={form.difficulty} name="difficulty" placeholder="From 1 to 5"/> */}
                {errors.difficulty && <p className='errors'>{errors.difficulty}</p>}
            </div>
            <div className='input-container'>
                <div className='label'>
                    <label >Duration </label>
                </div>
                <input className='input-div' type="text" onChange={handleChange} value={form.duration} name="duration" placeholder="Enter the duration in hours (1hs)"/>
                {errors.duration && <p className='errors'>{errors.duration}</p>}
            </div>

            <div className='input-container'>
                <div className='label'>
                    <label>Season</label>
                </div>
                <select className='select-div' onChange={handleSeasons}>
                    <option value="empty">Select season</option>
                    <option value="Summer">Summer</option>
                    <option value="Autumn">Autumn</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                </select>
                {errors.season && <p className='errors'>{errors.season}</p>}
            </div>

            <div className='input-container'>
                <div className='label'>
                <label >Country</label>
                </div>
            <select className='select-div' value={selected} onChange={event => [handleCountries(event), setSelected(event)]}>
                <option>Select Country</option>
                {countriesList?.map(country => {
                    return (
                        <option key={country.name}>
                            {country.name}
                        </option>
                    )
                })}
            </select>
            </div>
                {errors.countries && <p className='errors'>{errors.countries}</p>}
                <div>
                    {form.countries.map((country) => {
                        return(
                            <div className='country-selector' key={country}>
                                <p>{country}</p>
                                <button className='btn-country-selector' onClick={deleteCountry} value={country}> X </button>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <button className='button-submit' type="submit" disabled={ disabled ||
                errors.name ||
                errors.difficulty || 
                errors.duration || 
                errors.countries ||
                errors.season} onClick={handleErrors}>Create Activitiy</button>
                </div>
        </form>
        </div>
        <Footer/>
        </div>
)
}

export default Form;