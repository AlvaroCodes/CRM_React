import React from 'react'
import { Formik, Form, Field} from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = () => {

    const navigate = useNavigate();

    const nuevoCLienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El Nombre es muy corto').max(20, 'El nombre es muy largo').required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().email('Email no válido').required('El email es obligatorio'),
        telefono: Yup.number().integer('Numero no valido').positive('Numero no valido').typeError('EL número no es válido'),
    })

    const handleSubmit = async (valores) => {

        try {
            const url = 'http://localhost:4000/clientes'

            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(valores),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(respuesta);

            const resultado = await respuesta.json();
            console.log(resultado);

            navigate('/clientes')
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar Cliente</h1>

            <Formik
                initialValues={
                    {
                        nombre: '',
                        empresa: '',
                        email: '',
                        telefono: '',
                        notas: '',
                    }
                }

                onSubmit={async (value, {resetForm}) => {
                        await handleSubmit(value);
                        resetForm();
                    }}

                validationSchema={nuevoCLienteSchema}
            >
                {({errors, touched}) => (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor="nombre"
                                > Nombre: </label>
                                <Field
                                    id='nombre'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    type='text'
                                    placeholder='Nombre del Cliente'
                                    name='nombre'
                                />

                                {errors.nombre && touched.nombre ? (
                                  <Alerta>{errors.nombre}</Alerta>
                                ): null}
                               
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor="empresa"
                                > Empresa: </label>
                                <Field
                                    id='empresa'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    type='text'
                                    placeholder='Nombre de la Empresa'
                                    name='empresa'
                                />
                                  {errors.empresa && touched.empresa ? (
                                  <Alerta>{errors.empresa}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor="email"
                                > Email: </label>
                                <Field
                                    id='email'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    type='email'
                                    placeholder='Email del cliente'
                                    name='email'
                                />
                                {errors.email && touched.email ? (
                                  <Alerta>{errors.email}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor="telefono"
                                > Telefono: </label>
                                <Field
                                    id='telefono'
                                    className='mt-2 block w-full p-3 bg-gray-50'
                                    type='tel'
                                    placeholder='Telefono del cliente'
                                    name='telefono'
                                />
                                  {errors.telefono && touched.telefono ? (
                                  <Alerta>{errors.telefono}</Alerta>
                                ): null}
                            </div>

                            <div className='mb-4'>
                                <label
                                    className='text-gray-800'
                                    htmlFor="notas"
                                > Notas: </label>
                                <Field
                                    as='textarea'
                                    id='notas'
                                    className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                    type='text'
                                    placeholder='Notas del cliente'
                                    name='notas'
                                />
                            </div>

                            <input
                                type='submit'
                                value='Agregar un Cliente'
                                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                            />
                        </Form>
                    )
                }


            </Formik>
        </div>
    )
}

export default Formulario