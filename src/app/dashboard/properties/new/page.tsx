import { PropertyForm } from '@/components/PropertyForm'

export default function NewPropertyPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Tambah Properti Baru</h1>
                <p className="text-gray-600 mt-1">Isi form di bawah untuk menambahkan properti baru</p>
            </div>

            {/* Form */}
            <PropertyForm />
        </div>
    )
}
