import ReactGA from 'react-ga';

const reactGAEvebt = (category,action) => {
    ReactGA.event({
        category,
        action
    })
};

export default  reactGAEvebt;