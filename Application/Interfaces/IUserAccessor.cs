namespace Application.Interfaces
{
    //Application project doesn t have references to Infrastructure, in order I create this interface to access services
    // btw the references looks like Infrastructure -> Application , and API -> Infrastructure
    public interface IUserAccessor 
    {
        string GetUsername ();
    }
}