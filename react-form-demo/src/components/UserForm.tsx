import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  course: string;
  dateOfBirth: string;
  gender: string;
  acceptTerms: boolean;
};

type SavedFormData = Omit<FormData, "password" | "confirmPassword">;

type FormErrors = Partial<Record<keyof FormData, string>>;

const localStorageKey = "userFormDraft";

const initialFormData: FormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  course: "",
  dateOfBirth: "",
  gender: "",
  acceptTerms: false,
};

const getInitialFormData = (): FormData => {
  const savedData = localStorage.getItem(localStorageKey);

  if (!savedData) {
    return initialFormData;
  }

  try {
    const parsedData = JSON.parse(savedData) as SavedFormData;

    return {
      ...initialFormData,
      ...parsedData,
      password: "",
      confirmPassword: "",
    };
  } catch {
    return initialFormData;
  }
};

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const passwordData = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordData);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

function UserForm() {
  const [formData, setFormData] = useState<FormData>(getInitialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const dataToSave: SavedFormData = {
      fullName: formData.fullName,
      email: formData.email,
      course: formData.course,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      acceptTerms: formData.acceptTerms,
    };

    localStorage.setItem(localStorageKey, JSON.stringify(dataToSave));
  }, [
    formData.fullName,
    formData.email,
    formData.course,
    formData.dateOfBirth,
    formData.gender,
    formData.acceptTerms,
  ]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

      setFormData({
        ...formData,
        [name]: checked,
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select your date of birth";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Please accept the terms";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);
    setIsSubmitted(false);

    if (Object.keys(validationErrors).length === 0) {
      await hashPassword(formData.password);

      localStorage.removeItem(localStorageKey);
      setFormData(initialFormData);
      setIsSubmitted(true);
    }
  };

  const clearSavedDraft = () => {
    localStorage.removeItem(localStorageKey);
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-100 px-8 py-10">
      <form onSubmit={handleSubmit} className="w-full bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">User Form</h1>

        <p className="mt-1 text-sm text-gray-500">
          Register for consultation
        </p>

        {isSubmitted && (
          <div className="mt-5 border border-gray-300 bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700">
            Form submitted successfully!
          </div>
        )}

        <div className="mt-8">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-700 focus:bg-white"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-700 focus:bg-white"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-700 focus:bg-white"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-700 focus:bg-white"
          />

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Course <span className="text-red-500">*</span>
          </label>

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-700 focus:bg-white"
          >
            <option value="">Select course</option>
            <option value="react">React</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>

          {errors.course && (
            <p className="mt-1 text-sm text-red-500">{errors.course}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-700 focus:bg-white"
          />

          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="mt-6">
          <p className="mb-2 text-sm font-semibold text-gray-700">
            Gender <span className="text-red-500">*</span>
          </p>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-2 border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-800">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              Male
            </label>

            <label className="flex cursor-pointer items-center gap-2 border border-gray-400 bg-gray-50 px-4 py-3 text-sm text-gray-800">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>

          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
          )}
        </div>

        <div className="mt-6 border border-gray-300 bg-gray-50 p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4"
            />

            <span className="text-sm text-gray-700">
              I accept the terms and conditions{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>

          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-500">{errors.acceptTerms}</p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="submit"
            className="w-full bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-700"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={clearSavedDraft}
            className="w-full border border-gray-400 bg-gray-50 px-4 py-3 font-semibold text-gray-800 hover:bg-gray-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;