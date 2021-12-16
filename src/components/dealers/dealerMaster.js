import MasterLayout from "../_layout/_masterLayout";

export const DealerMaster = () => {
  return (
    <MasterLayout>
      <div className="row g-1">
        <div className="col-9">
          <div className="card h-100">
            <div className="card-body p-1">
                <div className="table-responsive">
                <table class="table table-striped table-custom">
                    <thead class="table-dark"> 
                        <tr>
                            <th>Dealer Name</th>
                            <th>Dealer Code</th>
                            <th>Dealer Location</th>
                            <th>E-Mail</th>
                            <th>Phone</th>
                            <th>State</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                </div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body p-2">
              <form>
                <div className="mb-2">
                  <label htmlFor="dealerName" className="form-label">
                    Dealer name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dealerName"
                    placeholder=""
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="dealerCode" className="form-label">
                    Dealer code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dealerCode"
                    placeholder=""
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="DealerLocation" className="form-label">
                    Dealer location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="DealerLocation"
                    placeholder=""
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="emailAddress" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone number
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="phoneNumber"
                    placeholder=""
                  />
                </div>
                
                <div className="mb-2">
                  <label htmlFor="stateSelect" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="stateSelect">
                      <option>--Select State--</option>
                  </select>
                </div>

                <div className="mb-2">
                  <label htmlFor="FullAddress" className="form-label">
                    Full address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullAddress"
                    placeholder=""
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
  );
};
