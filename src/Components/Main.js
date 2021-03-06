import React, { Component } from 'react';

import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';

import './../Styles/SCSS/Main.scss';
import './../Resources/ss-pika/webfonts/ss-pika.css';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: ''
        }
    };

    componentWillMount() {
        let windowInnerWidth = window.innerWidth;
        this.useWindowWidthToDefineLayout(windowInnerWidth);
    };

    componentDidMount() {
        window.addEventListener('resize', (e) => {
            let windowInnerWidth = e.target.innerWidth;
            this.useWindowWidthToDefineLayout(windowInnerWidth);
        });
    };

    useWindowWidthToDefineLayout = (width) => {
        if (width < 600) {
            this.setState({ layout: 'mobile' });
        } else if (width >= 600 && width <= 800) {
            this.setState({ layout: 'tablet' });
        } else {
            this.setState({ layout: 'desktop' });
        };
    };

    render() {
        return (
            <div>
                <Header layout={this.state.layout} />
                {/* Header will contain:
                Nav
                Pool Image */}
                <Body layout={this.state.layout} />
                {/* Body will contain:
                Filter
                Business listings */}
                <Footer layout={this.state.layout} />
                {/* Footer will contain:
                Logo
                Social Media Links
                Copyright
                Moving Links */}
            </div>
        );
    }
}

export default Main;
