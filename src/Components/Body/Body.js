import React, { Component } from 'react';

import Filter from './Filter';
import Listings from './Listings';

import dealers from '../../Resources/dealers.json'

class Body extends Component {

    constructor(props) {
        super(props);

        this.dealerArray = dealers.dealers;
        this.selectedCheckboxes = [];

        this.state = {
            displayArray: this.dealerArray,
            checkBoxes: {}
        };
    }

    checkboxToggle = (event) => {
        const id = event.target.id;
        const indexOfId = this.selectedCheckboxes.indexOf(id);

        if (this.state.checkBoxes[id] === true) {
            this.setState(prevState => ({
                checkBoxes: {
                    ...prevState.checkBoxes,
                    [id]: false
                }
            }));
        } else {
            let checkBoxes = Object.assign({}, this.state.checkBoxes);
            checkBoxes[id] = true;
            this.setState({ checkBoxes });
        }

        indexOfId > -1 ? this.selectedCheckboxes.splice(indexOfId, 1) : this.selectedCheckboxes.push(id)

        this.buildVisibleDealerArray();
    };

    buildVisibleDealerArray = () => {
        if (this.selectedCheckboxes.length === 0) {
            this.setState({ displayArray: this.dealerArray });
        } else {
            this.setState({
                displayArray: (
                    this.dealerArray.filter(dealer => {
                        let booleanHolder = this.selectedCheckboxes.reduce((accumulator, currentValue, currentIndex, array) => {
                            const trimmedDealerCertificationArray = dealer.data.certifications.map(cert => {
                                return cert.substring(0, cert.indexOf(' '));
                            });
                            return accumulator && trimmedDealerCertificationArray.indexOf(currentValue) > -1
                        }, true);
                        return booleanHolder ? dealer : false;
                    })
                )
            });
        }
    };

    render() {
        const { layout } = this.props;
        const zipcode = dealers.zipcode;
        return (
            <main>
                <Filter
                    checkBoxes={this.state.checkBoxes}
                    layout={layout}
                    checkboxToggle={this.checkboxToggle}
                    zipcode={zipcode}
                    dealers={this.state.displayArray} />
                <Listings
                    layout={layout}
                    dealers={this.state.displayArray} />
            </main>
        );
    }
}

export default Body;
