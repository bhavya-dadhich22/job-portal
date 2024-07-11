// eslint-disable-next-line react/prop-types
const Modal = ({ isUser, setupdateModal }) => {
  return (
    <div>
      {
        !isUser ?
          <div
            className="fixed  bg-black/40 backdrop-blur inset-0 z-[999] flex items-center justify-center overflow-y-auto overflow-x-hidden"
          >
            <div className="relative p-4 w-full   mx-20   max-h-full">
              <div className="relative  rounded-lg bg-white ">
                <div className="flex  bg-white  items-center justify-between p-4 md:p-5 border-b rounded-t :border-gray-600">
                  <h3 className="text-lg  font-semibold text-gray-900 :text-white">
                    Update profileee
                  </h3>
                  <button onClick={() => setupdateModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover:text-white" data-modal-toggle="crud-modal">
                    {/* <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg> */}X
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5 w-full">
                  <div className="grid gap-4 mb-4 grid-cols-3">
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div> :
          <div
            className="fixed  bg-black/30 backdrop-blur inset-0 z-[999] flex items-center justify-center overflow-y-auto   overflow-x-hidden"
          >
            <div className="relative  p-4 w-full  mx-20  shadow-xl max-h-full">
              <div className="relative bg-white rounded-lg shadow :bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t :border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 :text-white">
                    Update profile
                  </h3>
                  <button onClick={() => setupdateModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover:text-white" data-modal-toggle="crud-modal">
                    {/* <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg> */}X
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5 w-full">
                  <div className="grid gap-4 mb-4 grid-cols-3">
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-1">
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="Type product name" required="" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Price</label>
                      <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500" placeholder="$2999" required="" />
                    </div>

                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 :text-white">Product Description</label>
                      <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 :bg-gray-600 :border-gray-500 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Write product description here"></textarea>
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
      }
    </div>

  );
};

export default Modal;
