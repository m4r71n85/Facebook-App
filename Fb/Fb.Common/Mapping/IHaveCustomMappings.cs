namespace Fb.Common.Mapping
{
    using AutoMapper;

    internal interface IHaveCustomMappings
    {
        void CreateMappings(IConfiguration configuration);
    }
}
