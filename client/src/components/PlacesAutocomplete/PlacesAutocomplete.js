import React, { useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { InputGroup, FormControl, ListGroup } from 'react-bootstrap'
 
const PlacesAutocomplete = (props) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions 
    } = usePlacesAutocomplete({
        requestOptions: { /* Define search scope here */ },
        debounce: 300
    });

    const ref = useRef();

    useOnclickOutside(ref, () => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = e => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter as "false"
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
            props.setPosition({
                latitude: lat,
                longitude: lng
            });
        }).catch(error => {
            console.log('Error getting coordinates of location: ', error)
        });
    };

    const renderSuggestions = () =>
    data.map(suggestion => {
        const {
        id,
        structured_formatting: { main_text, secondary_text } 
        } = suggestion;

        return (
            <ListGroup.Item
                key={id}
                onClick={handleSelect(suggestion)}
                action
            >
                
                <strong>{main_text}</strong> <small>{secondary_text}</small>
            </ListGroup.Item>            
        );
    });

    return (
    <div ref={ref} className="location-autocomplete">
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Start location</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                placeholder="current location"
                value={value}
                onChange={handleInput}
                disabled={!ready}
            />
        </InputGroup>
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === 'OK' && 
        <div className="dropdown-autocomplete" style={{'position': 'absolute', 'z-index': '99', 'backgroundColor': 'white'}}>
            {/* <ul style={{'list-style-type': 'none', 'padding': '0px'}}>
                {renderSuggestions()}
            </ul> */}
            <ListGroup>
                {renderSuggestions()}
            </ListGroup>
        </div>
        }
    </div>
    );
};

export default PlacesAutocomplete;