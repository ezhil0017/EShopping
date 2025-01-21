import React from 'react';

const Register = () => {
  return (
    <section className='container w-full px-2 mx-auto'>
      <div className='w-full max-w-lg mx-auto my-4 bg-red-500 rounded'>
        <p>Welcome to Blinkeyit</p>
        <form>
          <div>
            <label htmlFor='name'>Name</label>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
