import Image from "next/legacy/image";

export default function ProfilePage() {
  return (
    <>
      <h4>Profile</h4>

      <div className="row">
        <div className="col-md-6">
          <form>
            <div className="text-danger"></div>
            <div className="form-group">
              <label asp-for="Username"></label>
              <input asp-for="Username" className="form-control" disabled />
            </div>

            <div className="form-group">
              <label></label>
              <input className="form-control" />
              <span className="text-danger"></span>
            </div>

            <div className="form-group">
              <label>Select Image</label>
              <div className="custom-file">
                <input
                  type="file"
                  className="form-control-file custom-file-input"
                  accept=".png,.jpg,.jpeg,.gif"
                />
                <label className="control-label custom-file-label">
                  Choose
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <Image
            src="https://res.cloudinary.com/dlwqjptsg/image/upload/v1667410187/My%20Uploads/ixucpehbbkggk7bi1xiq.jpg"
            className="img-fluid rounded"
            alt="profile image"
            width={320}
            height={320}
            placeholder="blur"
            blurDataURL="https://res.cloudinary.com/dlwqjptsg/image/upload/v1644730077/small_3551739_123584281c.jpg"
          />
        </div>
      </div>
    </>
  );
}
