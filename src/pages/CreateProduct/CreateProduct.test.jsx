import { render, screen, fireEvent } from "@testing-library/react";
import CreateProduct from './CreateProduct';
import { BrowserRouter } from "react-router-dom";
import store from "../../lib/store";
import { Provider } from 'react-redux'

const CreateProducts = () => (
    <BrowserRouter>
        <Provider store={store}>
            <CreateProduct />
        </Provider>
    </BrowserRouter>
)

describe('CreateProduct component', () => {
    test('Product Name dapat menerima input teks dan menampilkannya di halaman.', () => {
        const { getByLabelText, getByDisplayValue } = render(<CreateProducts />);
        const productNameInput = getByLabelText('Product name');
        fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
        expect(getByDisplayValue('Test Product')).toBeInTheDocument();
    });

    test('Setiap form yang dipilih dapat disimpan dan ditampilkan dengan benar.', () => {
        const { getByLabelText, getByDisplayValue, getByText } = render(<CreateProducts />);
        // Name
        const productNameInput = getByLabelText('Product name');
        fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
        expect(getByDisplayValue('Test Product')).toBeInTheDocument();

        // Category
        const categorySelect = getByLabelText('Product Category');
        fireEvent.change(categorySelect, { target: { value: 'Category 2' } });
        expect(getByDisplayValue('Category 2')).toBeInTheDocument();

        // Product Freshness
        const brandNewRadio = getByLabelText('Brand New');
        fireEvent.click(brandNewRadio);
        expect(getByText('Brand New')).toBeInTheDocument();

        const secondHandRadio = getByLabelText('Second Hand');
        fireEvent.click(secondHandRadio);
        expect(getByText('Second Hand')).toBeInTheDocument();

        const refurbishedRadio = getByLabelText('Refurbished');
        fireEvent.click(refurbishedRadio);
        expect(getByText('Refurbished')).toBeInTheDocument();

        // Description
        const descriptionInput = getByLabelText('Additional Description');
        fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
        expect(getByDisplayValue('Test description')).toBeInTheDocument();

        // Price
        const priceInput = getByLabelText('Product Price');
        fireEvent.change(priceInput, { target: { value: '10.99' } });
        expect(getByDisplayValue('10.99')).toBeInTheDocument();
    });

    test('Product Name tidak boleh kosong, tidak mengandung karakter @/#{}.', () => {
        const { getByLabelText, getByText } = render(<CreateProducts />);
        const productNameInput = getByLabelText('Product name');

        fireEvent.change(productNameInput, { target: { value: '' } });
        expect(getByText('Product name must be filled.')).toBeInTheDocument();

        fireEvent.change(productNameInput, { target: { value: '@Product#' } });
        expect(getByText("Product name cannot contain '@/#{}'.")).toBeInTheDocument();
    });

    test('Validasi form input yang benar bahwa product Name tidak melebihin 25 karakter', () => {
        const { getByLabelText, getByText } = render(<CreateProducts />);
        const productNameInput = getByLabelText('Product name');

        fireEvent.change(productNameInput, { target: { value: 'Cobain text panjang banget yang lebih dari 25 character' } });
        expect(getByText('Product name must be less than 25 characters.')).toBeInTheDocument();
    });

    test('Validasi semua form field tersebut tidak boleh kosong.', () => {
        const { getByLabelText, getByText } = render(<CreateProducts />);
        const submitButton = getByText('Submit');

        fireEvent.click(submitButton);
        expect(getByText('Please fill in all fields with valid data.')).toBeInTheDocument();
    });
});

