import React from 'react'
import './styles.scss'

interface CartResumeProps {
count: number;
cartTotal?: number,
shipTotal:string,
productSubtotal: string,
OnclickContinue: ()=> void;
}

const CartResume: React.FC<CartResumeProps> =({count, cartTotal = 0, shipTotal=0, productSubtotal = 0, OnclickContinue}) =>{

  return (
    <div className="card_resume">
      <span title='Rezime' className='resume_title'/>

      <div className="content">
        <div className="resume_separated_info">
          <p>Total Pwodui ({count})</p>
          <h5>{productSubtotal}</h5>
        </div>
        <hr />

        <div className="resume_separated_info">
          <p>Livrezon</p>
          <h5>{shipTotal}</h5>
        </div>
        <hr />

        <div className="resume_separated_info">
          <p>Total </p>
          <h5>{cartTotal}</h5>
        </div>
        <hr />

      </div>


      {/* <div className="resume_buttons">
        <CustomButton backgroundColor ='#00C02A' textColor="#fff">
        <Link to="/checkout/userinfos">Kontinye</Link>
        </CustomButton>
        <CustomButton backgroundColor ='#001A5C' textColor="#fff" onClick={OnclickContinue}>
          Kontinye Achte
        </CustomButton>
      </div> */}
    </div>
  )
}

export default CartResume;
