import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO, SecondNav, Zygote } from 'components';
import Helmet from 'react-helmet';
import BuyButton from './BuyButton';
import Img from 'gatsby-image';
import { Grid, GridItem } from 'styled-grid-component';
import { openCart, addToCart } from 'cart';
// import { SRLWrapper } from "simple-react-lightbox";


const Wrapper = styled.div`
  padding: 1rem 0 2rem 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  color: hsl(0, 0%, 29%);
  font-weight: 400;
`;

const Image = styled.span`
  background: #eee;
  flex: 1;
  min-height: 50vh;  
`;

const Info = styled.span`
  margin-top: 2rem;
  flex: 1;
  line-height: 1.75;
  color: hsl(228, 34.9%, 23.1%);
`;

const ItemName = styled.h3`
  margin: 1rem 0 0.5rem 0;
  font-weight: 700;
  //color: hsl(228, 34.9%, 23.1%);
`;

const Cost = styled.span`
  //color: lighten($black, 20%);
  //color: hsl(228, 34.9%, 23.1%);
  font-size: 1.5rem;
  margin: 1rem 0;
  font-weight: 500;
`;
const StyledImg = styled(Img)`
  display: block;
  margin: 0 auto;
  width: 10%;
  border-radius: 5;
`;
const Story = styled.article`
  padding-top: 1rem;
  grid-column-start: span 2;
`;
const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border: 0px solid black;
  background: hsl(220, 12%, 95%);
  box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  border-radius: 10px 10px 10px 10px;
  tr {
    :nth-of-type(even) {
      background-color: hsla(228, 34.9%, 83.1%, 0.3);
    }
    color: hsl(228, 34.9%, 23.1%);
  }

  thead {
    background: #c5cbe3;
    th {
      text-align: center;
    }
  }
`;


const ItemContent = ({ post, skuObj, skus, html }) => {

  let itemQuantity = 0;
  let itemImage
  if(post.sku) {
    let itemSkuArray = skuObj.find(obj => obj.sku == post.sku)
    console.log(itemSkuArray);
    itemQuantity = itemSkuArray.quantity;
    itemImage = itemSkuArray.image;
  }

  //console.log(`itemImage: ${itemImage}`)
  
  
  return (
    <Wrapper>
      <Grid
        display="flex"
        flex-wrap="wrap"
        width="100%"
        height="100%"
        templateColumns="repeat(2, 1fr)"
        gap="70px"
        autoRows="max-content"
      >
        <GridItem column="1" row="1">
          <Image>
            <Img fluid={post.pic.childImageSharp.fluid} alt="" />
          </Image>
          {/* <SRLWrapper>
          </SRLWrapper> */}

        </GridItem>
        <GridItem column="2 " row="1">
          <Info>
            <ItemName>{post.title}</ItemName>
            <p>
              <em>{post.scientificname}</em>
            </p>
            <p>
              Only {itemQuantity} left in stock!
            </p>
            <Cost>
              <strong>${post.price}</strong>
            </Cost>
            <p>
            {/* <a href={`${post.care}`}>Care Instructions</a> */}
            </p>
            
            {/* <p className="ItemName">
                  {post.story}
              </p>  */}
            {/* <BuyButton post={post}></BuyButton> */}

            <button style={{
              backgroundColor: 'hsl(228, 34.9%, 83.1%)',
              borderRadius: '5px',
              marginTop: '36px',
              border: '0',
              color: 'hsl(228, 34.9%, 23.1%)',
              fontWeight: '500',
              paddingBottom: '15px',
              paddingTop: '15px',
              paddingRight: '35px',
              paddingLeft: '35px',
              fontSize: '24',
            }}
         onClick={() => addToCart({
              id: `${post.sku}`,
              name: post.title,
              image: itemImage, //`https://via.placeholder.com/75x75`, //itemImage,
              description: ``,
              price: Math.round(post.price*100),
              shippable: true,
              quantity: 1,
              stock: itemQuantity,
            })}>
              Add to Cart!
            </button> 

            {/* <button onClick={openCart}>Open Cart</button> */}
          </Info>
        </GridItem>
      </Grid>
      <Grid>
        <br />
        <GridItem column=" 1 / 2" row="2">
        <Story
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
          <br />
        </GridItem>
      </Grid>

      <hr></hr>

      {/* <Table>
        <thead>
            <tr>
              <th colspan="2" >Plant Details</th>
            </tr>
          </thead>
        <tbody>
          <tr>
            <th scope="row">Primary Color: </th>
            <td>{post.primarycolor}</td>
          </tr>
          <tr>
            <th scope="row">Stress Color:</th>
            <td>{post.stresscolors}</td>
          </tr>
          <tr>
            <th scope="row">Bloom Color: </th>
            <td>{post.bloomcolor}</td>
          </tr>
          <tr>
            <th scope="row">Pet Safe: </th>
            <td>{post.petsafe}</td>
          </tr>
          <tr>
            <th scope="row">Seasonality:</th>
            <td>{post.seasonality}</td>
          </tr>
          <tr>
            <th scope="row">Temperature: </th>
            <td>{post.temperature}</td>
          </tr>
        </tbody>
      </Table> */}
    </Wrapper>
  );
};

export default ItemContent;


