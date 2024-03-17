import { useState } from 'react';
import Modal from '../Modal/Modal';

export default function OpenOrder() {
  const [open, setOpen] = useState(false);

  return (
    <section className='w-full p-6 px-9'>
      <header className='py-3'>
        <h1 className='text-2xl'>Administrar órdenes</h1>
        <p className='text-sm text-gray-500'>Pagar órden #321</p>
      </header>
      <div className='border shadow-xl p-6'>
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Producto 1</td>
              <td>1</td>
              <td>Nota</td>
            </tr>
            <tr>
              <td>Producto 2</td>
              <td>1</td>
              <td>Nota</td>
            </tr>
            <tr>
              <td>Producto 3</td>
              <td>1</td>
              <td>Nota</td>
            </tr>
            <tr>
              <td></td>
              <td>Total:</td>
              <td>$100</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setOpen(true)}
        className='w-full my-3 p-2 bg-blue-700 text-white rounded shadow-md'
      >
        Pagar
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className='flex flex-col justify-around gap-6'>
          <legend className='font-semibold'>Se recibe*</legend>
          <input className='border w-full' type='number' min='1' />
          <legend className='font-semibold'>Su cambio:</legend>
          <input
            className='border w-full'
            type='text'
            min='1'
            readOnly
            value={'$0'}
          />

          <button
            type='submit'
            className='w-full p-2 bg-gray-700 text-white rounded shadow-md'
          >
            Pagar
          </button>
        </form>
      </Modal>
    </section>
  );
}
