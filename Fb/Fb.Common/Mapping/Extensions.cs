namespace Fb.Common.Mapping
{
    using AutoMapper;

    public static class Extensions
    {
        public static TDestination Map<TSource, TDestination>(
    this TDestination destination, TSource source)
        {
            return Mapper.Map(source, destination);
        }
    }
}
