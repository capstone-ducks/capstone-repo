import React, { Component } from "react";
import { Card, Icon, Grid, Image, Header, Divider } from "semantic-ui-react";

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div className="about-us-container">
                    <div className="about-us-header">
                        <Header as="h2" icon textAlign="center">
                            <Header.Content>The Project</Header.Content>
                        </Header>
                        <Image centered size="large" />
                    </div>
                    <div className="about-us-description">
                        <p className="centertext">
                            TheGoodBlock is a decentralized platform that
                            enables doners to give directly to recipients
                            without requiring a third-party trust. By making
                            transactions on the blockchain, our site removes the
                            ‘middle man’ of charities and banking organizations.
                            The product leverages Ethereum smart-contract
                            architecture to disperse large donations to many
                            recipients’ public keys in accordance with a donor’s
                            requirements, including their geographic, employment
                            status, and quantity constraints.
                        </p>
                    </div>
                    <Image
                        src="/images/utils/TheGoodBlockModel.png"
                        centered
                        size="huge"
                    />
                </div>
                <div className="about-us-container">
                    <div className="about-us-header">
                        <Header as="h2" icon textAlign="center">
                            <Header.Content>The Team</Header.Content>
                        </Header>
                    </div>
                    <Grid centered>
                        <Grid.Row columns={4} centered>
                            <Grid.Column width="3">
                                <Card
                                    image="/images/utils/alcott-dev-pic.jpeg"
                                    header="Alcott Vernon"
                                    meta="Developer"
                                    // description="Alcott description."
                                    extra={
                                        <div className="grid-col">
                                            <a href="https://github.com/CapReynolds">
                                                <Icon name="github square" />
                                                GitHub
                                            </a>
                                            <a href="https://www.linkedin.com/in/alcott-vernon-ja/">
                                                <Icon name="linkedin square" />
                                                LinkedIn
                                            </a>
                                        </div>
                                    }
                                />
                            </Grid.Column>
                            <Grid.Column width="3">
                                <Card
                                    image="/images/utils/emily-dev-pic.jpeg"
                                    header="Emily Asaro"
                                    meta="Developer"
                                    // description="Emily description."
                                    extra={
                                        <div className="grid-col">
                                            <a href="https://github.com/emilyasaro">
                                                <Icon name="github square" />
                                                GitHub
                                            </a>
                                            <a href="https://www.linkedin.com/in/emily-pearl-asaro/">
                                                <Icon name="linkedin square" />
                                                LinkedIn
                                            </a>
                                        </div>
                                    }
                                />
                            </Grid.Column>
                            <Grid.Column width="3">
                                <Card
                                    image="/images/utils/linda-dev-pic.jpeg"
                                    header="Linda Nzeukang"
                                    meta="Developer"
                                    // description="Linda description."
                                    extra={
                                        <div className="grid-col">
                                            <a href="https://github.com/LindaLaura">
                                                <Icon name="github square" />
                                                GitHub
                                            </a>
                                            <a href="https://www.linkedin.com/in/linda-nzeukang-81a25521/">
                                                <Icon name="linkedin square" />
                                                LinkedIn
                                            </a>
                                        </div>
                                    }
                                />
                            </Grid.Column>
                            <Grid.Column width="3">
                                <Card
                                    image="/images/utils/anthony-dev-pic.jpeg"
                                    header="Anthony Sgro"
                                    meta="Developer"
                                    // description="Anthony description."
                                    extra={
                                        <div className="grid-col">
                                            <a href="https://github.com/anthonysgro">
                                                <Icon name="github square" />
                                                GitHub
                                            </a>
                                            <a href="https://www.linkedin.com/in/sgro/">
                                                <Icon name="linkedin square" />
                                                LinkedIn
                                            </a>
                                        </div>
                                    }
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>

                <div className="about-us-container">
                    <div className="about-us-header">
                        <Header as="h2" icon textAlign="center">
                            <Header.Content>The Tech Stack</Header.Content>
                        </Header>
                        <Image centered size="large" />
                    </div>
                    <Grid centered columns={3} divided>
                        <Grid.Row centered column={5}>
                            <Grid.Column width="3">
                                <Header as="h3" icon textAlign="center">
                                    <Header.Content>Back End</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width="3">
                                <Header as="h3" icon textAlign="center">
                                    <Header.Content>Front End</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width="3">
                                <Header as="h3" icon textAlign="center">
                                    <Header.Content>Blockchain</Header.Content>
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/node.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/react.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/solidity.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/express.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/redux.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/metamask.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/sequelize.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/semanticui.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/web3.jpeg"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/postgresql.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/webpack.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/ganache.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column
                                verticalAlign="middle"
                                width="3"
                            ></Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/reactrouter.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                            <Grid.Column verticalAlign="middle" width="3">
                                <Image
                                    src="/images/utils/techstack/truffle.png"
                                    size="small"
                                    centered
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default AboutUs;
