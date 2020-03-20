import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import React, { Component } from 'react';
import { Media } from 'reactstrap';

class DishDetail extends Component {
	
	renderDish(dish) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }
	renderComments(dish){
		
		
		if(dish!=null){
			const comments = dish.comments.map((comments) => {
            return (
              <div key={comments.id} className="col-12 mt-5">
                <Media tag="li">
                  <Media body className="ml-5">
                   <p>{comments.comment}</p>
				   <p>--{comments.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                  </Media>
                </Media>
              </div>
            );
			});
		return(
			<div className="container">
				<div className="row">
				  <h4>Comments:</h4>	
				  <Media list>
					  {comments}
				  </Media>
				</div>
			</div>
			);
		}
			
		else
			return(<div></div>);
	}
	render(){
		if(this.props.selectedDish !=null)
		return (
			<div className="row">
				<div className="col-12 col-md-5 m-1">{this.renderDish(this.props.selectedDish)}</div>
				<div className="col-12 col-md-5 m-1">
				{this.renderComments(this.props.selectedDish)}
				</div>
			</div>
		);
		else
			return(<div></div>);
	}
}

export default DishDetail;