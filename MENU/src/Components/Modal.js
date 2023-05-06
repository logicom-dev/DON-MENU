import { Component } from 'react';
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import image from "./article3.jpg"
export default class Modal extends Component {
    render() {
        let modelStyle = {
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.8)',
            
        }
        return (
            <section>
                <div className="modal show fade" style={modelStyle} >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.LibArt}</h5>
                                <button type="button" className="btn-close" onClick={this.props.hide}></button>
                            </div>
                            <div className="modal-body">
                                <Card variant="outlined" sx={{ width: 320 }}>
                                    <CardOverflow>
                                        <AspectRatio ratio="2">
                                            <img
                                                src={this.props.image_web}
                                                srcSet={this.props.image_web}
                                                loading="lazy"
                                                alt=""
                                            />
                                        </AspectRatio>

                                    </CardOverflow>
                                    <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                                        <p>{this.props.Descrip}</p>
                                    </Typography>
                                    <Divider inset="context" />
                                    <CardOverflow
                                        variant="soft"
                                        sx={{
                                            display: 'flex',
                                            gap: 1.5,
                                            py: 1.5,
                                            px: 'var(--Card-padding)',
                                            bgcolor: 'background.level1',
                                        }}
                                    >
                                        <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                                        Prix : {this.props.prix1} Dt
                                        </Typography>
                                    </CardOverflow>

                                </Card>


                            </div>
                            <div className="modal-footer">
                               {/*  <button type="button" className="btn btn-primary">Ajouter au panier</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
