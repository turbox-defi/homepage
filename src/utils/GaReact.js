import ReactGA from 'react-ga';

const reactGAEvebt = (category,action,value=0, label='') => {
    
    ReactGA.event({
        category: `${category} - ${action}`,
        action : label,
        label : String(value)
    })
};

export default  reactGAEvebt;